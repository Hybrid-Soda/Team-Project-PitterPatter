using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Round1 : BaseRound
{
    public override void Enter(GameScene GM)
    {
        roundTime = 20f;
        base.Enter(GM);
        Managers.Coroutine.Run(Countdown(GM));
    }

    public override void Update(GameScene GM)
    {
        if (GM.playTime >= GM.nextTime)
        {
            GM.UpdateRound(new Round2());
        }
    }

    private IEnumerator Countdown(GameScene GM)
    {
        yield return new WaitForSeconds(2f);

        for (int i = 0; i < GM.countSprites.Length; i++)
        {
            GM.countImage.sprite = GM.countSprites[i];
            Managers.Sound.Play("SFX/Countdown", Define.Sound.SFX);
            GM.countImage.gameObject.SetActive(true);
            yield return new WaitForSeconds(0.7f);
            GM.countImage.gameObject.SetActive(false);
            yield return new WaitForSeconds(0.3f);
        }
    }
}

public class Round2 : BaseRound
{

    public override void Enter(GameScene GM)
    {
        roundTime = 20f;
        base.Enter(GM);
    }

    public override void Update(GameScene GM)
    {
        if (GM.playTime >= GM.nextTime)
        {
            GM.UpdateRound(new Round3());
        }
    }
}

public class Round3 : BaseRound
{
    private bool isEnd = false;

    public override void Enter(GameScene GM)
    {
        roundTime = 10f;
        base.Enter(GM);
    }

    public override void Update(GameScene GM)
    {
        if (!isEnd && GM.playTime >= GM.nextTime)
        {
            isEnd = true;
            Managers.Coroutine.Run(Clear(GM));
        }
    }

    private IEnumerator Clear(GameScene GM)
    {
        GM.clearImage.gameObject.SetActive(true);
        Managers.Sound.Play("SFX/Success", Define.Sound.SFX);
        yield return new WaitForSeconds(3f);
        GM.clearImage.gameObject.SetActive(false);
        Managers.Network.playTimeTxt = GM.playTimeTxt.text;
        Managers.Scene.LoadScene(Define.Scene.ScoreScene);
    }
}
