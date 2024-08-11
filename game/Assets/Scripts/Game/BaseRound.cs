using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public abstract class BaseRound
{
    protected float roundTime;

    public virtual void Enter(GameScene GM)
    {
        GM.round++;
        GM.nextTime = GM.playTime + roundTime;
        Managers.Coroutine.Run(ShowRoundImage(GM));
    }

    public abstract void Update(GameScene GM);

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