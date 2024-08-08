using UnityEngine;
using TMPro;

public class ViewWall : MonoBehaviour
{
    public int round;
    public GameObject[] wall;
    public GameObject[] wall2;

    private int nowWall;
    private float preTime;
    private float genSpeed;
    private GameScene gameScene;
    private RoundUp roundUp;
    private readonly float[] genSpeeds = { 9.0f, 8.0f, 7.0f, 6.0f, 5.0f, 4.0f };

    void Start()
    {
        preTime = Time.time; // 초기 시간 설정
        gameScene = FindObjectOfType<GameScene>();
        roundUp = FindObjectOfType<RoundUp>();
        SetGenSpeed();
    }

    void Update()
    {
        if (gameScene != null)
            round = gameScene.round;

        // 일정 시간이 지나면 벽 생성
        if (Time.time - preTime > genSpeed && roundUp.isRoundUp == false)
        {
            if (round == 1)
            {
                CreateWall(wall);
            }
            else if (round == 2)
            {
                CreateWall(wall2);
            }

            preTime = Time.time; // 현재 시간 갱신
        }
    }

    public void CreateWall(GameObject[] wallArray)
    {
        // 랜덤 벽 선택 및 벽 생성 (x, y, z)
        nowWall = Random.Range(0, round == 1 ? wall.Length : wall2.Length);
        
        if (wallArray != null)
            if (round == 1)
            {
                Instantiate(wallArray[nowWall], new Vector3(0, 1, 35), Quaternion.Euler(0, 180, 0) * wallArray[nowWall].transform.rotation);
            }
            else if (round == 2)
            {
                Instantiate(wallArray[nowWall], new Vector3(0, 1, 35), Quaternion.Euler(0, 180, 0) * wallArray[nowWall].transform.rotation);
            }
    }

    private void SetGenSpeed()
    {
        // 난이도에 따른 벽 속도 설정
        int diffLevel = Managers.Play.diffLevel;
        genSpeed = (diffLevel >= 1 && diffLevel <= 6) ? genSpeeds[diffLevel - 1] : 8.0f;
    }
}
