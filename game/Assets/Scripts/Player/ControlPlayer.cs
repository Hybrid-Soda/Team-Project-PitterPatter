using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControlPlayer : MonoBehaviour
{
    public Animation2 a2;
    public Transform[] people;

    // 사람의 위치와 회전을 업데이트
    void Update()
    {
        GameObject[] body = a2.Body;

        people[0].position = (body[23].transform.position + body[24].transform.position) / 2;

        people[1].rotation = Quaternion.Euler(0, 0, 0);
        people[1].rotation = Quaternion.FromToRotation(people[1].up, (body[11].transform.position + body[12].transform.position) / 2 - people[1].position);
        people[1].rotation = Quaternion.LookRotation(Vector3.Cross(body[12].transform.position - people[1].position, body[11].transform.position - people[1].position), people[1].up);

        people[5].rotation = Quaternion.Euler(0, 0, 0);
        Vector3 p5up = (body[2].transform.position + body[5].transform.position) / 2 - (body[9].transform.position + body[10].transform.position) / 2;
        Vector3 p5forward = Vector3.Cross(body[0].transform.position - body[9].transform.position, body[0].transform.position - body[10].transform.position);
        people[5].rotation = Quaternion.FromToRotation(people[5].right, Vector3.Cross(p5forward, p5up));
        people[5].Rotate(0, 180, 0);

        people[7].rotation = Quaternion.Euler(0, 0, 0);
        people[7].rotation = Quaternion.FromToRotation(people[7].up, body[25].transform.position - body[23].transform.position);

        people[8].rotation = Quaternion.Euler(0, 0, 0);
        people[8].rotation = Quaternion.FromToRotation(people[8].up, body[27].transform.position - body[25].transform.position);

        people[9].rotation = Quaternion.Euler(0, 0, 0);
        people[9].rotation = Quaternion.FromToRotation(people[9].up, body[31].transform.position - body[27].transform.position);

        people[11].rotation = Quaternion.Euler(0, 0, 0);
        people[11].rotation = Quaternion.FromToRotation(people[11].up, body[26].transform.position - body[24].transform.position);
    
        float p11u = Quaternion.FromToRotation(
            people[11].forward, Vector3.Cross(body[24].transform.position - body[23].transform.position, body[26].transform.position - body[24].transform.position)
            ).eulerAngles.y;

        people[11].Rotate(0, p11u, 0);
        people[12].rotation = Quaternion.Euler(0, 0, 0);
        people[12].rotation = Quaternion.FromToRotation(people[12].up, body[28].transform.position - body[26].transform.position);
        people[13].rotation = Quaternion.Euler(0, 0, 0);
        people[13].rotation = Quaternion.FromToRotation(people[13].up, body[32].transform.position - body[28].transform.position);

        people[15].rotation = Quaternion.Euler(0, 0, 0);
        people[15].rotation = Quaternion.FromToRotation(people[15].up, body[13].transform.position - body[11].transform.position);
        people[16].rotation = Quaternion.Euler(0, 0, 0);
        people[16].rotation = Quaternion.FromToRotation(people[16].up, body[15].transform.position - body[13].transform.position);


        people[18].rotation = Quaternion.Euler(0, 0, 0);
        people[18].rotation = Quaternion.FromToRotation(people[18].up, body[14].transform.position - body[12].transform.position);
        people[19].rotation = Quaternion.Euler(0, 0, 0);
        people[19].rotation = Quaternion.FromToRotation(people[19].up, body[16].transform.position - body[14].transform.position);
    }
}
