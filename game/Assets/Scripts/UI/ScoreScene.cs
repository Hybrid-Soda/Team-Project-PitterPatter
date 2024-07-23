using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;


public class ScoreScene : MonoBehaviour
{
    public Text playTimeTxt;
    public Text correctScoreTxt;

    void Start()
    {
        playTimeTxt.text = GameManager.Instance.playTimeTxt;
        // 점수 텍스트 업데이트
        correctScoreTxt.text = string.Format("{0:0}", GameManager.Instance.finalScore);
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
