using UnityEngine;
using TMPro;

public class ViewWall : MonoBehaviour
{
    public int round;
    public GameObject[] wall;
    public GameObject[] wall2;

    private readonly float[] genSpeeds = { 9.0f, 8.0f, 7.0f, 6.0f, 5.0f, 4.0f };
    private GameScene gameScene;
    private RoundUp roundUp;
    private float genSpeed;
    private float preTime;
    private int nowWall;

    void Start()
    {
        Init();
    }

    void Update()
    {
        // 라운드 갱신
        if (gameScene != null) round = gameScene.round;
        // 벽 생성
        if (round == 1)
        {
            GenWall(wall);
        }
        else if (round == 2)
        {
            GenWall(wall2);
        }
    }

    private void Init()
    {
        gameScene = FindObjectOfType<GameScene>();
        roundUp = FindObjectOfType<RoundUp>();
        preTime = Time.time;
        SetGenSpeed();
    }

    // 일정 시간이 지나면 벽 생성
    private void GenWall(GameObject[] wallArray)
    {
        if (Time.time - preTime > genSpeed && !roundUp.isRoundUp)
        {
            nowWall = Random.Range(0, wallArray.Length);
            Instantiate(wallArray[nowWall], new Vector3(0, 1, 35), Quaternion.Euler(0, 180, 0) * wallArray[nowWall].transform.rotation);
            preTime = Time.time;
        }
    }

    // 난이도에 따른 벽 속도 설정
    private void SetGenSpeed()
    {
        int diffLevel = Managers.Play.diffLevel;
        genSpeed = (diffLevel >= 1 && diffLevel <= 6) ? genSpeeds[diffLevel - 1] : 8.0f;
    }
}
