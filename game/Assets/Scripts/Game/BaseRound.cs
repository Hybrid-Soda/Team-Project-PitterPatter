using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public abstract class BaseRound
{
    protected float roundTime;

    // 라운드 진입 메서드
    public virtual void Enter(GameScene GM)
    {
        GM.round++;
        GM.nextTime = GM.playTime + roundTime;
        Managers.Coroutine.Run(ShowRoundImage(GM));
    }

    // 업데이트 메서드 (상속받은 클래스에서 구현)
    public abstract void Update(GameScene GM);

    // 라운드 이미지 표시 코루틴
    private IEnumerator ShowRoundImage(GameScene GM)
    {
        GM.isRoundUp = true;
        yield return new WaitForSeconds(5.5f);

        if (GM.round == 3)
        {
            Managers.Sound.Play("BGM/DanceBgm", Define.Sound.BGM);
        }

        if (GM.roundImage != null)
        {
            GM.roundImage.sprite = GM.roundSprites[GM.round - 1];
            Managers.Sound.Play("SFX/RoundUp", Define.Sound.SFX);
            
            GM.roundImage.gameObject.SetActive(true);
            yield return new WaitForSeconds(2.5f);
            GM.roundImage.gameObject.SetActive(false);
            GM.isRoundUp = false;
        }
    }
}