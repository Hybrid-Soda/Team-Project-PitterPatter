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
    private static GameManager instance = null;

    // 싱글톤 인스턴스에 접근하기 위한 정적 프로퍼티
    public static GameManager Instance
    {
        get
        {
            if (null == instance)
            {
                return null;
            }
            return instance;
        }
    }

    // 싱글톤을 위한 인스턴스 관리
    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
        else
        {
            Destroy(this.gameObject);
        }
    }

    public void ToStart() // "Main" 씬으로 이동
    {
        SceneManager.LoadScene("Main");
    }

    public void ToDifficulty() // "Difficulty" 씬으로 이동
    {
        SceneManager.LoadScene("Difficulty");
    }

    public void ToGame()
    {
        SceneManager.LoadScene("Game");
    }

    public void ToScore() // "Score" 씬으로 이동
    {
        PlayerPrefs.SetInt("Score", finalScore);
        SceneManager.LoadScene("Score");
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
