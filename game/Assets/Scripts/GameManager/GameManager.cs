using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public int finalScore;
    public float playTime;
    public string playTimeTxt;
    public int difficultyLevel;

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
    void Awake()
    {
        DontDestroyOnLoad(gameObject);
    }
}
