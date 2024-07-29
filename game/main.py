import cv2
import asyncio
import websockets
from cvzone.PoseModule import PoseDetector

# 웹캠 캡처 설정
cap = cv2.VideoCapture(0)

# 포즈 감지기 초기화
detector = PoseDetector()
poseList = []

async def send_pose_data(websocket, path):
    while True:
        # 웹캠 이미지 읽기
        success, frame = cap.read()

        if not success:
            print("Failed to capture image")
            break

        # 포즈 감지 및 위치 정보 가져오기
        frame = detector.findPose(frame)
        lmList, bboxInfo = detector.findPosition(frame)
        print(lmList)
        print()

        if bboxInfo:
            lmString = ''
            for lm in lmList:
                if len(lm) == 3:
                    lmString += f'{lm[0]},{frame.shape[0] - lm[1]},{lm[2]},'
                elif len(lm) == 4:
                    lmString += f'{lm[1]},{frame.shape[0] - lm[2]},{lm[3]},'
            poseList.append(lmString)

            if len(poseList) >= 5:
                avgPos = []
                for i in range(len(lmList)):
                    xPos, yPos, zPos = [], [], []

                    for j in range(len(poseList)-2, len(poseList)+3):
                        if j >= 0 and j < len(poseList):
                            coords = poseList[j].split(',')
                            if i * 3 + 2 < len(coords):
                                xPos.append(float(coords[i * 3]))
                                yPos.append(float(coords[i * 3 + 1]))
                                zPos.append(float(coords[i * 3 + 2]))

                    xAvg = sum(xPos) / len(xPos)
                    yAvg = sum(yPos) / len(yPos)
                    zAvg = sum(zPos) / len(zPos)
                    avgPos.append(f'{xAvg},{yAvg},{zAvg},')

                avgPosString = ''.join(avgPos)
                print(avgPosString)
                print()
                await websocket.send(avgPosString)

        # 이미지를 창에 표시
        cv2.imshow("Pose Detection", frame)
        key = cv2.waitKey(1)
        if key == ord('s'):
            break

    cap.release()
    cv2.destroyAllWindows()

start_server = websockets.serve(send_pose_data, "127.0.0.1", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()