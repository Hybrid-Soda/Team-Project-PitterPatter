import cv2
import socket
import mediapipe as mp

# 웹캠 캡처 설정
cap = cv2.VideoCapture(0)

# 포즈 감지기 초기화
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

# UDP 소켓 설정
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverAddressPort = ("127.0.0.1", 5054)

poseList = []

while True:
    # 웹캠 이미지 읽기
    success, frame = cap.read()
    
    if not success:
        print("Failed to capture image")
        break

    # BGR 이미지를 RGB로 변환
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 포즈 감지
    result = pose.process(rgb_frame)
    if result.pose_landmarks:
        lmList = []
        for id, lm in enumerate(result.pose_landmarks.landmark):
            h, w, _ = frame.shape
            cx, cy, cz = lm.x * w, lm.y * h, lm.z * w
            lmList.append([id, cx, cy, cz])

        lmString = ''
        # 랜드마크 리스트를 문자열로 변환
        for lm in lmList:
            lmString += f'{frame.shape[1] - lm[1]},{frame.shape[0] - lm[2]},{frame.shape[1] - lm[3]},'
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

                xAvg = round(sum(xPos) / len(xPos), 1)
                yAvg = round(sum(yPos) / len(yPos), 1)
                zAvg = round(sum(zPos) / len(zPos), 1)
                avgPos.append(f'{xAvg},{yAvg},{zAvg},')

            avgPosString = ''.join(avgPos)
            # 평균 좌표 UDP로 전송
            sock.sendto(avgPosString.encode(), serverAddressPort)

        # 랜드마크와 연결선 그리기
        mp_drawing.draw_landmarks(frame, result.pose_landmarks, mp_pose.POSE_CONNECTIONS)

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
