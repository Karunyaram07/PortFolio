import cv2
import os

video_path = r"a:\July2026\PortFolio\public\Recording 2026-07-07 014303.mp4"
output_dir = r"a:\July2026\PortFolio\public"

print("Opening video:", video_path)
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: Could not open video.")
    exit(1)

length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
print(f"Total frames: {length}, FPS: {fps}")

# Extract frames at 10%, 50%, and 90% of the video
for percent in [10, 50, 90]:
    frame_no = int(length * percent / 100)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
    ret, frame = cap.read()
    if ret:
        out_name = os.path.join(output_dir, f"frame_{percent}.jpg")
        cv2.imwrite(out_name, frame)
        print(f"Saved frame {frame_no} ({percent}%) to {out_name}")
    else:
        print(f"Failed to extract frame at {percent}%")

cap.release()
print("Done!")
