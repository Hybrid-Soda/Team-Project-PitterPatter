using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public int finalScore;
    public float playTime;
    public string playTimeTxt;
    public int difficultyLevel;
    public string poseData;

    // 싱글톤 인스턴스를 저장할 정적 변수
    private static GameManager instance;

    // 싱글톤 인스턴스에 접근하기 위한 정적 프로퍼티
    public static GameManager Instance { get { Init(); return instance; } }

    static void Awake()
    {
        Init();
    }

    private void Start()
    {
        Application.targetFrameRate = -1; // 프레임 속도를 기본값인 -1로 설정하여 브라우저 렌더 루프에 맞추도록 함
    }


    private static void Init()
    {
        if (instance == null)
        {
            GameObject gameObject = new GameObject("GameManager");
            instance = gameObject.AddComponent<GameManager>();
            DontDestroyOnLoad(gameObject);
        }
    }

    public void SetDifficulty(int level)
    {
        difficultyLevel = level;
    }

    public void ReceiveData(string data)
    {
        poseData = data;
    }
}
