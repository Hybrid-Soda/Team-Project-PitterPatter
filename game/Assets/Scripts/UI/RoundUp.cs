using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class RoundUp : MonoBehaviour
{

    public Image roundImage; // 표시할 이미지
    public Sprite[] roundSprites; // 각 라운드에 해당하는 스프라이트 배열
    public float displayDuration = 2.5f; // 이미지 표시 시간
    public bool isRoundUp = false;

    private GameScene gameScene;
    private int currentRound;

    void Start()
    {
        gameScene = FindAnyObjectByType<GameScene>();
        roundImage.gameObject.SetActive(false);
    }

    // 라운드 증가 시 호출되는 메서드
    public void IncreaseRound()
    {
        StartCoroutine(DisplayRoundImage());
    }

    private IEnumerator DisplayRoundImage()
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
