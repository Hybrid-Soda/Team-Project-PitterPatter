using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public GameObject[] Body;
    private List<string> animationData;
    private Vector3[] targetPositions;
    private int counter = 0;

    void Start()
    {
        animationData = new List<string>();
        targetPositions = new Vector3[Body.Length];
    }

    void Update()
    {
        string receivedData = Managers.Network.poseData;
        if (receivedData == null) return;

        // 데이터 전처리
        string[] points = ProcessData(receivedData);

        // 각 Body 객체에 대해 위치 업데이트
        if (points.Length >= 99) UpdatePos(points);

        // 각 Body 객체의 현재 위치를 목표 위치로 보간하여 이동
        for (int i = 0; i < Body.Length; i++)
        {
            Vector3 currentPosition = Body[i].transform.localPosition;
            Vector3 targetPosition = targetPositions[i];
            Vector3 newPosition = Vector3.Lerp(currentPosition, targetPosition, 0.2f);
            Body[i].transform.localPosition = newPosition;
        }

        counter++;

        if (counter == points.Length)
            counter = 0;

        StartCoroutine(WaitForNextFrame());
    }

    // 받은 데이터를 전처리하여 배열로 반환
    private string[] ProcessData(string data)
    {
        if (data.Length > 1)
        {
            data = data.Substring(1, data.Length - 2);
        }

        return data.Split(',');
    }

    // 데이터를 이용해 각 Body 파츠의 목표 위치 업데이트
    private void UpdatePos(string[] points)
    {
        for (int i = 0; i < 33 && i < Body.Length; i++)
        {
            if (float.TryParse(points[0 + (i * 3)], out float x) && 
                float.TryParse(points[1 + (i * 3)], out float y) && 
                float.TryParse(points[2 + (i * 3)], out float z))
            {
                targetPositions[i] = new Vector3(x / 100f, y / 100f, z / 300f);
            }
        }
    }

    // 다음 프레임까지 대기하는 코루틴 (대략 한 프레임)
    private IEnumerator WaitForNextFrame()
    {
        yield return new WaitForSeconds(0.01f);
    }
}
