using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class RoundUp : MonoBehaviour
{

    public Image startImage;
    public Image roundImage;
    public Sprite[] roundSprites;
    public float displayDuration = 2.5f;
    public bool isRoundUp = false;

    private GameScene gameScene;
    private int currentRound;

    void Start()
    {
        gameScene = FindAnyObjectByType<GameScene>();
        roundImage.gameObject.SetActive(false);
        StartCoroutine(DisplayStartImg());
    }

    // 라운드 증가 시 호출되는 메서드
    public void IncreaseRound()
    {
        StartCoroutine(DisplayRoundImg());
    }

    private IEnumerator DisplayStartImg()
    {
        startImage.gameObject.SetActive(true);
        yield return new WaitForSeconds(2f);
        startImage.gameObject.SetActive(false);
    }

    private IEnumerator DisplayRoundImg()
    {
        if (currentRound < roundSprites.Length)
        {
            currentRound = gameScene.round;
            roundImage.sprite = roundSprites[currentRound - 1];
        }
        else
        {
            roundImage.sprite = roundSprites[^1];
        }

        isRoundUp = true;
        yield return new WaitForSeconds(3.5f);
        AudioManager.instance.PlaySfx(AudioManager.Sfx.RoundUp);
        roundImage.gameObject.SetActive(true);
        yield return new WaitForSeconds(displayDuration);
        roundImage.gameObject.SetActive(false);
        yield return new WaitForSeconds(1f);
        isRoundUp = false;
    }
}
