using UnityEngine;
using TMPro;

public class ViewWall : MonoBehaviour
{
    public GameObject[] wall; // 벽 오브젝트 배열
    private int nowWall; // 현재 벽 인덱스
    private float nextWallTime = 0f; // 다음 벽 생성 시간
    private float preTime; // 이전 시간

    void Start()
    {
        preTime = Time.time; // 초기 시간 설정

        switch (GameManager.Instance.difficultyLevel)
        {
            case 1:
                nextWallTime = 9.0f; // 쉬운 난이도
                break;
            case 2:
                nextWallTime = 8.0f; // 보통 난이도
                break;
            case 3:
                nextWallTime = 7.0f; // 중간 난이도
                break;
            case 4:
                nextWallTime = 5.0f; // 조금 어려운 난이도
                break;
            case 5:
                nextWallTime = 4.0f; // 어려운 난이도
                break;
            case 6:
                nextWallTime = 2.0f; // 매우 어려운 난이도
                break;
            default:
                nextWallTime = 8.0f; // 기본값
                break;
        }
    }

    void Update()
    {
        // 일정 시간이 지나면 벽 생성
        if (Time.time - preTime > nextWallTime)
        {
            nowWall = Random.Range(0, wall.Length); // 랜덤 벽 선택
            // nextWallTime = Random.Range(5, 8); // 다음 벽 생성 시간 설정
            // 벽 생성 (x, y, z)
            Instantiate(wall[nowWall], new Vector3(35, 4.3f, 0), Quaternion.Euler(0, -90, 0) * wall[nowWall].transform.rotation);
            preTime = Time.time; // 현재 시간 갱신
        }
    }
}
