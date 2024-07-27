using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

public class GameScene : MonoBehaviour
{
    public int round;
    public float playTime;
    public Text playTimeTxt;
    public Text scoreTxt;
    public Text roundTxt;
    public bool getPoint;
    private int score;

    // 충돌한 오브젝트 리스트와 점수 획득 여부 저장
    public List<GameObject> colliders = new List<GameObject>();

    void Start()
    {
        round = 1;
        playTime = 0;
        score = 0;
        colliders.Clear();
        getPoint = false;
    }

    // 점수 업데이트
    public void UpdateScore()
    {
        // 충돌한 오브젝트가 9개 이상일 경우 점수 10 증가 (perfect)
        if (colliders.Count >= 9)
        {
            getPoint = true;
            score += 10;
            GameManager.Instance.finalScore = score;
        }
        // 충돌한 오브젝트가 6개 이상일 경우 점수 5 증가 (good)
        else if (colliders.Count >= 6)
        {
            getPoint = true;
            score += 5;
            GameManager.Instance.finalScore = score;
        }
        // 충돌한 오브젝트가 3개 이상일 경우 점수 3 증가 (soso)
        else if (colliders.Count >= 3)
        {
            getPoint = true;
            score += 3;
            GameManager.Instance.finalScore = score;
        }
    }

    void Update()
    {
        playTime += Time.deltaTime;

        // 일정 시간 이상이 되면 게임 종료 (5분)
        if (playTime >= 300)
        {
            GameManager.Instance.playTime = playTime;
            GameManager.Instance.playTimeTxt = playTimeTxt.text;
            SceneManager.LoadScene("Score");
        }
    }

    private void LateUpdate()
    {
        // upper UI
        scoreTxt.text = string.Format("{0:n0}", score);
        roundTxt.text = string.Format("{0:n0}", round);

        int hour = (int)(playTime / 3600);
        int min = (int)((playTime - hour * 3600) / 60);
        int second = (int)(playTime % 60);
        playTimeTxt.text = string.Format("{0:00}", hour) + ":" + string.Format("{0:00}", min) + ":" + string.Format("{0:00}", second);
    }
}
