import cv2
import socket
from cvzone.PoseModule import PoseDetector

# 웹캠 캡처 설정
cap = cv2.VideoCapture(0)

# 포즈 감지기 초기화
detector = PoseDetector()
poseList = []

# UDP 소켓 설정
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverAddressPort = ("127.0.0.1", 5054)

while True:
    # 웹캠 이미지 읽기
    success, frame = cap.read()
    
    if not success:
        print("Failed to capture image")
        break

    # 포즈 감지 및 위치 정보 가져오기
    frame = detector.findPose(frame)
    # lmList : 신체 특징점들의 리스트 [cx, cy, cz] (어깨, 팔꿈치, 손목 등)
    # bounding box Info : 객체 박스 좌표 {'bbox': (x1, y1, x2 - x1, y2 - y1), 'center': (cx, cy)}
    lmList, bboxInfo = detector.findPosition(frame)

    if bboxInfo:
        lmString = ''
        # 랜드마크 리스트를 문자열로 변환
        for lm in lmList:
            # 각 좌표를 쉼표(,)로 구분하여 CSV 형식의 문자열로 변환
            # y 좌표를 이미지 높이에서 빼서 일반적인 좌표계로 변환
            if len(lm) == 3:
                lmString += f'{lm[0]},{frame.shape[0] - lm[1]},{lm[2]},'
            elif len(lm) == 4:
                lmString += f'{lm[1]},{frame.shape[0] - lm[2]},{lm[3]},'
        poseList.append(lmString)

        if len(poseList) >= 5:
            avgPos = []
            for i in range(len(lmList)):
                xPos, yPos, zPos = [], [], []

                # 최근 5개의 프레임에서 평균 좌표 계산
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
            # 평균 좌표 UDP로 전송
            sock.sendto(avgPosString.encode(), serverAddressPort)

    # 이미지를 창에 표시
    cv2.imshow("Pose Detection", frame)
    # 각 프레임 간격은 1ms
    key = cv2.waitKey(1)

    # 's' 키를 누르면 종료
    if key == ord('s'):
        break

# 자원 해제
cap.release()
cv2.destroyAllWindows()
