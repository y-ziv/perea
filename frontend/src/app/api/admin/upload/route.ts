import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { withAdminAuth } from "@/lib/admin-auth";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Magic byte signatures for allowed image types
const MAGIC_BYTES: [Uint8Array, string][] = [
  [new Uint8Array([0xff, 0xd8, 0xff]), "image/jpeg"],
  [new Uint8Array([0x89, 0x50, 0x4e, 0x47]), "image/png"],
  [new Uint8Array([0x52, 0x49, 0x46, 0x46]), "image/webp"], // RIFF header
];

function detectMimeType(buffer: Buffer): string | null {
  for (const [magic, mime] of MAGIC_BYTES) {
    if (buffer.length >= magic.length && magic.every((b, i) => buffer[i] === b)) {
      return mime;
    }
  }
  return null;
}

export const POST = withAdminAuth(async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const detectedMime = detectMimeType(buffer);
    if (!detectedMime || !ALLOWED_TYPES.has(detectedMime)) {
      return NextResponse.json(
        { error: "File content does not match an allowed image type" },
        { status: 400 }
      );
    }

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "perea/wines", resource_type: "image" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("POST /api/admin/upload:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
});
