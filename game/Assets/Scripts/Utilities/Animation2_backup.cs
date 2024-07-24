using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Animation2_backup : MonoBehaviour
{
    public UDPReceive udpReceive; // UDP 데이터 수신 객체
    public GameObject[] Body; // 애니메이션 대상 객체들
    private List<string> animationData; // 애니메이션 데이터 리스트
    private Vector3[] targetPositions; // 목표 위치 배열
    private int counter = 0; // 카운터 변수
    private float interpolationFactor = 0.2f; // 보간 비율

    void Start()
    {
        animationData = new List<string>(); // 애니메이션 데이터 초기화
        targetPositions = new Vector3[Body.Length]; // 목표 위치 배열 초기화

        // 첫 번째 Body 객체의 초기 목표 위치를 (2, 3.264482, 0)로 설정
        if (Body.Length > 0)
        {
            targetPositions[0] = new Vector3(2f, 3.264482f, 0f);
            Body[0].transform.localPosition = targetPositions[0]; // 처음 시작 시 위치 설정
        }
    }

    void Update()
    {
        string receivedData = udpReceive.data; // 수신된 데이터 가져오기
        if (receivedData.Length > 1)
        {
            // 데이터의 처음과 끝의 문자 제거
            receivedData = receivedData.Remove(0, 1);
            receivedData = receivedData.Remove(receivedData.Length - 1, 1);
        }

        string[] points = receivedData.Split(','); // 데이터 포인트 분할
        if (points.Length >= 99)
        {
            // 각 Body 객체에 대해 위치 업데이트
            for (int i = 0; i < 33 && i < Body.Length; i++)
            {
                if (float.TryParse(points[0 + (i * 3)], out float x) && float.TryParse(points[1 + (i * 3)], out float y) && float.TryParse(points[2 + (i * 3)], out float z))
                {
                    // 좌표 변환 및 목표 위치 설정
                    x /= 100f;
                    y /= 100f;
                    z /= 300f;
                    Vector3 targetPosition = new Vector3(x, y, z);
                    targetPositions[i] = targetPosition;
                }
            }
        }

        // 각 Body 객체의 현재 위치를 목표 위치로 보간하여 이동
        for (int i = 0; i < Body.Length; i++)
        {
            Vector3 currentPosition = Body[i].transform.localPosition;
            Vector3 targetPosition = targetPositions[i];
            Vector3 newPosition = Vector3.Lerp(currentPosition, targetPosition, interpolationFactor);
            Body[i].transform.localPosition = newPosition;
        }

        counter++;
        if (counter == points.Length)
            counter = 0;

        StartCoroutine(WaitForNextFrame()); // 다음 프레임 대기
    }

    // 다음 프레임까지 대기하는 코루틴
    private IEnumerator WaitForNextFrame()
    {
        yield return new WaitForSeconds(0.01f);
    }
}
