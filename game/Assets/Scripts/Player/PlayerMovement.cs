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
        GameObject[] body = pc.Body;

        landmark[0].position = (body[23].transform.position + body[24].transform.position) / 2;

        landmark[1].rotation = Quaternion.Euler(0, 0, 0);
        landmark[1].rotation = Quaternion.FromToRotation(landmark[1].up, (body[11].transform.position + body[12].transform.position) / 2 - landmark[1].position);
        landmark[1].rotation = Quaternion.LookRotation(Vector3.Cross(body[12].transform.position - landmark[1].position, body[11].transform.position - landmark[1].position), landmark[1].up);

        landmark[5].rotation = Quaternion.Euler(0, 0, 0);
        Vector3 p5up = (body[2].transform.position + body[5].transform.position) / 2 - (body[9].transform.position + body[10].transform.position) / 2;
        Vector3 p5forward = Vector3.Cross(body[0].transform.position - body[9].transform.position, body[0].transform.position - body[10].transform.position);
        landmark[5].rotation = Quaternion.FromToRotation(landmark[5].right, Vector3.Cross(p5forward, p5up));
        landmark[5].Rotate(0, 180, 0);

        landmark[7].rotation = Quaternion.Euler(0, 0, 0);
        landmark[7].rotation = Quaternion.FromToRotation(landmark[7].up, body[25].transform.position - body[23].transform.position);

        landmark[8].rotation = Quaternion.Euler(0, 0, 0);
        landmark[8].rotation = Quaternion.FromToRotation(landmark[8].up, body[27].transform.position - body[25].transform.position);

        landmark[9].rotation = Quaternion.Euler(0, 0, 0);
        landmark[9].rotation = Quaternion.FromToRotation(landmark[9].up, body[31].transform.position - body[27].transform.position);

        landmark[11].rotation = Quaternion.Euler(0, 0, 0);
        landmark[11].rotation = Quaternion.FromToRotation(landmark[11].up, body[26].transform.position - body[24].transform.position);
    
        float p11u = Quaternion.FromToRotation(
            landmark[11].forward, Vector3.Cross(body[24].transform.position - body[23].transform.position, body[26].transform.position - body[24].transform.position)
            ).eulerAngles.y;

        landmark[11].Rotate(0, p11u, 0);
        landmark[12].rotation = Quaternion.Euler(0, 0, 0);
        landmark[12].rotation = Quaternion.FromToRotation(landmark[12].up, body[28].transform.position - body[26].transform.position);
        landmark[13].rotation = Quaternion.Euler(0, 0, 0);
        landmark[13].rotation = Quaternion.FromToRotation(landmark[13].up, body[32].transform.position - body[28].transform.position);

        landmark[15].rotation = Quaternion.Euler(0, 0, 0);
        landmark[15].rotation = Quaternion.FromToRotation(landmark[15].up, body[13].transform.position - body[11].transform.position);
        landmark[16].rotation = Quaternion.Euler(0, 0, 0);
        landmark[16].rotation = Quaternion.FromToRotation(landmark[16].up, body[15].transform.position - body[13].transform.position);


        landmark[18].rotation = Quaternion.Euler(0, 0, 0);
        landmark[18].rotation = Quaternion.FromToRotation(landmark[18].up, body[14].transform.position - body[12].transform.position);
        landmark[19].rotation = Quaternion.Euler(0, 0, 0);
        landmark[19].rotation = Quaternion.FromToRotation(landmark[19].up, body[16].transform.position - body[14].transform.position);
    }
}
