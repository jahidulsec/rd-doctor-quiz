import path from "path";
import { promises as fs } from "fs";
import mime from "mime"; // You need to install this package
import { params } from "@/types/search-params";

export async function GET(
  req: Request,
  { params }: { params: params }
) {
  const { id } = await params;

  try {
    const filePath = path.join(process.cwd(), `public`, "doctors", String(id));

    // Check if the file exists
    const fileExists = await fs.stat(filePath);

    if (!fileExists) {
      throw new Error("No file");
    }

    // Get the MIME type based on the file extension
    const mimeType = mime.getType(filePath);

    if (!mimeType) {
      throw new Error("Unsupported file type");
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Set the correct content type

    return new Response(fileBuffer);
  } catch (error) {
    console.log(error);
    return new Response("");
  }
}
