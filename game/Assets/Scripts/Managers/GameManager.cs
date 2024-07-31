using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public int finalScore;
    public float playTime;
    public string poseData;
    public string playTimeTxt;
    public int backgroundNum;
    public int difficultyLevel;

    // 싱글톤 인스턴스를 저장할 정적 변수
    private static GameManager instance;

    // 싱글톤 인스턴스에 접근하기 위한 정적 프로퍼티
    public static GameManager Instance { get { return instance; } }

    void Awake()
    {
        if (instance != null && instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        instance = this;
        DontDestroyOnLoad(gameObject);

        // 프레임 속도 -1(기본값)로 설정: 브라우저 렌더 루프에 맞춤
        Application.targetFrameRate = -1;
    }

    public void SetDifficulty(int level)
    {
        difficultyLevel = level;
    }

    public void ReceiveData(string data)
    {
        poseData = data;
    }

    public void ReceiveStaticData()
    {
        backgroundNum = 1;
    }
}
