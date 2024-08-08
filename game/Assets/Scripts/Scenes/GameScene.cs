using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameScene : MonoBehaviour
{
    public int round;
    public bool getPoint;
    public Text scoreTxt;
    public Text playTimeTxt;
    public Image clearImage;
    public Image feedbackImg;
    public List<Image> feedbackImgs;
    public List<GameObject> colliders = new();

    private int score;
    private bool isEnded;
    private float playTime;
    private float roundDuration;
    private float nextRoundTime;
    private RoundUp roundUp;

    void Start()
    {
        roundUp = FindAnyObjectByType<RoundUp>();
        Init();
    }

    private void Init()
    {
        round = 1;
        score = 0;
        playTime = 0;
        isEnded = false;
        getPoint = false;
        colliders.Clear();
        roundDuration = 20f;
        nextRoundTime = roundDuration;
        clearImage.gameObject.SetActive(false);
        feedbackImg.gameObject.SetActive(false);
        GameManager.Instance.UnityCall(false);
    }

    void Update()
    {
        if (roundUp.isRoundUp == false)
        {
            playTime += Time.deltaTime;
            UpdateUI();
        }

        if (!isEnded && playTime >= nextRoundTime)
        {
            if (round == 3) EndGame();
            else StartNewRound();
        }
    }

    private void StartNewRound()
    {
        round++;
        roundUp.IncreaseRound();

        if (round == 3) roundDuration = 10f;

        nextRoundTime = playTime + roundDuration;
        colliders.Clear();
        getPoint = false;
    }

    private void UpdateUI()
    {
        scoreTxt.text = score.ToString("n0");

        int hour = (int)(playTime / 3600);
        int min = (int)(playTime % 3600 / 60);
        int second = (int)(playTime % 60);

        playTimeTxt.text = $"{hour:00}:{min:00}:{second:00}";
    }

    // 점수 업데이트
    public void UpdateScore(int round)
    {
        getPoint = true;
        int scoreInc = CalcScore(colliders.Count, round);
        score += scoreInc;
        GameManager.Instance.finalScore = score;
        GameManager.Instance.UnityCall(false);
        SetFbMsg(scoreInc);
    }

    // 점수 계산
    private int CalcScore(int count, int round)
    {
        if (round == 1)
        {
            if (count >= 9) return 10;
            if (count >= 6) return 5;
            if (count >= 3) return 3;
        }
        else
        {
            if (count < 3) return 10;
            if (count < 6) return 5;
            if (count < 9) return 3;
        }
        return 0;
    }

    private void SetFbMsg(int scoreInc)
    {
        switch (scoreInc)
        {
            case 10: // Perfect
                AudioManager.instance.PlaySfx(AudioManager.Sfx.GetScore);
                feedbackImg = feedbackImgs[0];
                break;
            case 5: // Great
                AudioManager.instance.PlaySfx(AudioManager.Sfx.GetScore);
                feedbackImg = feedbackImgs[1];
                break;
            case 3: // Good
                AudioManager.instance.PlaySfx(AudioManager.Sfx.GetScore);
                feedbackImg = feedbackImgs[2];
                break;
            case 0:
                AudioManager.instance.PlaySfx(AudioManager.Sfx.NoGetScore);
                break;
        }

        StartCoroutine(FbMsg());
    }

    private IEnumerator FbMsg()
    {
        feedbackImg.gameObject.SetActive(true);
        yield return new WaitForSeconds(1.5f);
        feedbackImg.gameObject.SetActive(false);
    }

    private void EndGame()
    {
        isEnded = true;
        clearImage.gameObject.SetActive(true);
        AudioManager.instance.PlaySfx(AudioManager.Sfx.Success);
        StartCoroutine(LoadScoreScene(3f));
    }

    private IEnumerator LoadScoreScene(float delay)
    {
        GameManager.Instance.playTime = playTime;
        GameManager.Instance.playTimeTxt = playTimeTxt.text;
        GameManager.Instance.UnityCall(true);
        yield return new WaitForSeconds(delay);
        SceneManager.LoadScene("Score");
        clearImage.gameObject.SetActive(false);
        AudioManager.instance.StopBgm();
    }
}
