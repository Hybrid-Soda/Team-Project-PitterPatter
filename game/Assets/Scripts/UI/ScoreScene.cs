using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;


public class ScoreScene : MonoBehaviour
{
    public float playTime;
    public Text playTimeTxt;
    public Text correctScoreTxt;

    void Start()
    {
        GameManager.Instance.finalScore = PlayerPrefs.GetInt("Score"); // 저장된 점수 불러오기
        correctScoreTxt.text = string.Format("{0:0}", GameManager.Instance.finalScore); // 점수 텍스트 업데이트
        // playTimeTxt.text = gm.playTimeTxt; // 점수 텍스트 업데이트
    }

    public void GoToMain()
    {
        SceneManager.LoadScene("Main");
    }

    public void Retry()
    {
        SceneManager.LoadScene("Difficulty");
    }
}
