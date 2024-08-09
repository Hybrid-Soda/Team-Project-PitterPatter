using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public PlayerController pc;
    public Transform[] landmark;


    // 사람의 위치와 회전을 업데이트
    void Update()
    {
        if (pc != null)
        {
            GameObject[] body = pc.Body;
            
            if (body != null)
            {
                UpdatePrimaryLandmarks(body);
                UpdateOtherLandmarks(body);
            }
        }
    }

    // 엉덩이, 목, 몸통 위치 업데이트
    private void UpdatePrimaryLandmarks(GameObject[] body)
    {
        Vector3 holePosition = (body[23].transform.position + body[24].transform.position) / 2;
        holePosition.x *= 2.5f;
        holePosition.x -= 0.1f;
        holePosition.y = 0;
        landmark[23].position = holePosition;

        landmark[1].rotation = Quaternion.Euler(0, 0, 0);
        landmark[1].rotation = Quaternion.FromToRotation(landmark[1].up, (body[11].transform.position + body[12].transform.position) / 2
                                                                       - (body[23].transform.position + body[24].transform.position) / 2);
        landmark[2].rotation = Quaternion.Euler(0, 0, 0);
        landmark[2].rotation = Quaternion.FromToRotation(landmark[1].up, (body[11].transform.position + body[12].transform.position) / 2
                                                                       - (body[23].transform.position + body[24].transform.position) / 2);
        landmark[2].Rotate(-10, 0, 0);

        landmark[3].rotation = Quaternion.Euler(0, 0, 0);
        landmark[3].rotation = Quaternion.FromToRotation(landmark[1].up, (body[11].transform.position + body[12].transform.position) / 2
                                                                       - (body[23].transform.position + body[24].transform.position) / 2);
        landmark[4].rotation = Quaternion.Euler(0, 0, 0);
        landmark[4].rotation = Quaternion.FromToRotation(landmark[1].up, (body[9].transform.position + body[10].transform.position) / 2
                                                                       - (body[11].transform.position + body[12].transform.position) / 2);
        landmark[4].Rotate(-45, 0, 0);

        landmark[5].rotation = Quaternion.Euler(0, 0, 0);
        Vector3 p5up = (body[2].transform.position + body[5].transform.position) / 2 - (body[9].transform.position + body[10].transform.position) / 2;
        Vector3 p5forward = Vector3.Cross(body[0].transform.position - body[9].transform.position, body[0].transform.position - body[10].transform.position);
        landmark[5].rotation = Quaternion.FromToRotation(landmark[5].right, Vector3.Cross(p5forward, p5up));
        landmark[5].Rotate(0, 180, 10);

        // 제한 각도 설정
        float maxNeckAngle = 15.0f;
        Vector3 euler = landmark[5].localEulerAngles;
        euler.x = Mathf.Clamp(euler.x, -maxNeckAngle, 1);
        euler.y = Mathf.Clamp(euler.y, -maxNeckAngle, maxNeckAngle);
        euler.z = Mathf.Clamp(euler.z, -maxNeckAngle, maxNeckAngle);
        landmark[5].localEulerAngles = euler;
    }

    // 나머지 랜드마크 회전 업데이트
    private void UpdateOtherLandmarks(GameObject[] body)
    {
        UpdateLimbRotation(7, body[25], body[23], 180); // LeftUpLeg
        UpdateLimbRotation(8, body[27], body[25]); // LeftLeg
        UpdateLimbRotation(9, body[31], body[27], 180); // LeftFoot
        UpdateLimbRotation(11, body[26], body[24], 180); // RightUpLeg
        UpdateLimbRotation(12, body[28], body[26]); // RightLeg
        UpdateLimbRotation(13, body[32], body[28], 180); // RightFoot
        UpdateLimbRotation(15, body[13], body[11], 180); // LeftArm
        UpdateLimbRotation(16, body[15], body[13], 90); // LeftForeArm
        UpdateLimbRotation(17, body[19], body[15]); // LeftHand
        UpdateLimbRotation(18, body[14], body[12], 180); // RightArm
        UpdateLimbRotation(19, body[16], body[14], 90); // RightForeArm
        UpdateLimbRotation(20, body[20], body[16]); // RightHand
        landmark[21].rotation = landmark[0].rotation; // Hip.L
        landmark[22].rotation = landmark[0].rotation; // Hip.R
    }

    private void UpdateLimbRotation(int landmarkIndex, GameObject start, GameObject end, float rotateY = 0, float rotateX = 0)
    {
        landmark[landmarkIndex].rotation = Quaternion.Euler(0, 0, 0);
        landmark[landmarkIndex].rotation = Quaternion.FromToRotation(landmark[landmarkIndex].up, start.transform.position - end.transform.position);
        landmark[landmarkIndex].Rotate(rotateX, rotateY, 0);
    }
}