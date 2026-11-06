export async function GET() {
  return Response.json({
    success: true,
    message: "LightPay API is running",
    tasks: [],
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = body.title;

    if (typeof title !== "string" || title.trim().length === 0) {
      return Response.json(
        { success: false, message: "A valid task title is required." },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Task received successfully.",
        task: { title: title.trim() },
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON request." },
      { status: 400 }
    );
  }
}
