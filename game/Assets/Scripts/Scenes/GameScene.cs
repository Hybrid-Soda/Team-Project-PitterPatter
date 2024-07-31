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
    public Image clearImage;
    public bool getPoint;
    private int score;
    private float roundDuration;
    private float nextRoundTime;

    // 충돌한 오브젝트 리스트와 점수 획득 여부 저장
    public List<GameObject> colliders = new List<GameObject>();

    void Start()
    {
        round = 1;
        playTime = 0;
        score = 0;
        colliders.Clear();
        getPoint = false;
        roundDuration = 10f;
        nextRoundTime = roundDuration;
        clearImage.gameObject.SetActive(false);
    }

    // 점수 업데이트
    public void UpdateScore()
    {
        getPoint = true;
        // 충돌한 오브젝트가 9개 이상 -> 10점 (perfect)
        if (colliders.Count >= 9) { score += 10; }
        // 충돌한 오브젝트가 6개 이상 -> 5점 (good)
        else if (colliders.Count >= 6) { score += 5; }
        // 충돌한 오브젝트가 3개 이상 -> 3점 (soso)
        else if (colliders.Count >= 3) { score += 3; }
        GameManager.Instance.finalScore = score;
    }

    public void UpdateScore2()
    {
        getPoint = true;
        // 충돌한 오브젝트가 3개 미만 -> 10점 (perfect)
        if (colliders.Count < 3) { score += 10; }
        // 충돌한 오브젝트가 6개 미만 -> 5점 (good)
        else if (colliders.Count < 6) { score += 5; }
        // 충돌한 오브젝트가 9개 미만 -> 3점 (soso)
        else if (colliders.Count < 9) { score += 3; }
        GameManager.Instance.finalScore = score;
    }

    void Update()
    {
        playTime += Time.deltaTime;

        // 라운드 변경 처리
        if (playTime >= nextRoundTime)
        {
            if (round == 3)
            {
                AudioManager.instance.PlaySfx(AudioManager.Sfx.Success);
                EndGame();
            }
            else
            {
                round++;
                if (round == 3)
                {
                    // AudioManager.instance.PlayBgm(AudioManager.Bgm.);
                    roundDuration = 5f; // 3라운드는 1분
                }
                nextRoundTime = playTime + roundDuration; // 다음 라운드 시간 설정
                colliders.Clear();
                getPoint = false;
            }
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


    private void EndGame()
    {
        // "Clear" 문구를 보여주고 5초 후에 다음 씬으로 이동
        clearImage.gameObject.SetActive(true);
        StartCoroutine(LoadScoreScene(5f));
    }

    private IEnumerator LoadScoreScene(float delay)
    {
        GameManager.Instance.playTime = playTime;
        GameManager.Instance.playTimeTxt = playTimeTxt.text;
        yield return new WaitForSeconds(delay);
        SceneManager.LoadScene("Score");
        clearImage.gameObject.SetActive(false);
        AudioManager.instance.StopBgm();
    }
}
