import cv2
import numpy as np
import os

# Define the paths to the model files
weights_path = r"C:\Users\Madhav\OneDrive\Desktop\abc\yolov3.weights"
config_path = r"C:\Users\Madhav\OneDrive\Desktop\abc\yolov3.cfg"
names_path = r"C:\Users\Madhav\OneDrive\Desktop\abc\coco.names"

# Check if the files exist
if not os.path.isfile(weights_path):
    print(f"Error: {weights_path} not found")
    exit()
if not os.path.isfile(config_path):
    print(f"Error: {config_path} not found")
    exit()
if not os.path.isfile(names_path):
    print(f"Error: {names_path} not found")
    exit()

# Load YOLO
net = cv2.dnn.readNet(weights_path, config_path)

# Load COCO names
with open(names_path, "r") as f:
    classes = [line.strip() for line in f.readlines()]

# Get the output layer names
layer_names = net.getLayerNames()
try:
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]
except AttributeError:  # for older versions of OpenCV
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# Initialize video capture
cap = cv2.VideoCapture(0)

def get_movement_direction(frame_width, frame_height, center_x, center_y):
    if center_x < frame_width / 3:
        return "Move Left"
    elif center_x > 2 * frame_width / 3:
        return "Move Right"
    elif center_y < frame_height / 3:
        return "Move Up"
    elif center_y > 2 * frame_height / 3:
        return "Move Down"
    else:
        return "Stay"

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    height, width, channels = frame.shape

    # Detecting objects
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids = []
    confidences = []
    boxes = []

    # Information to show on screen
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and class_id == classes.index("person"):
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[class_ids[i]])
            confidence = confidences[i]
            color = (0, 255, 0)
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            cv2.putText(frame, f"{label} {int(confidence * 100)}%", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            # Calculate movement direction
            center_x = x + w // 2
            center_y = y + h // 2
            direction = get_movement_direction(width, height, center_x, center_y)
            cv2.putText(frame, direction, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            print(f"Human detected. Direction: {direction}")

    cv2.imshow("Image", frame)

    key = cv2.waitKey(1)
    if key == 27:  # ESC key to break
        break

cap.release()
cv2.destroyAllWindows()
