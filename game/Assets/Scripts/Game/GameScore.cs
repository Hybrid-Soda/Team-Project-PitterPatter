using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameScore
{
    public void UpdateScore(GameScene GM)
    {
        int addScore = CalcScore(GM);
        Feedback(GM, addScore);
    }

    // 점수 업데이트
    private int CalcScore(GameScene GM)
    {
        int addScore = 0;
        int count = GM.colliders.Count;
        
        if (count >= 9) addScore = 10;
        else if (count >= 6) addScore = 5;
        else if (count >= 3) addScore = 3;

        GM.score += addScore;
        Managers.Network.finalScore = GM.score;
        Managers.Network.UnityCall(false, false);
        GM.colliders.Clear();

        return addScore;
    }

    private void Feedback(GameScene GM, int addScore)
    {
        switch (addScore)
        {
            case 10: // Perfect
                GM.scoreImage.sprite = GM.scoreSprites[0];
                break;
            case 5: // Great
                GM.scoreImage.sprite = GM.scoreSprites[1];
                break;
            case 3: // Good
                GM.scoreImage.sprite = GM.scoreSprites[2];
                break;
            case 0:
                Managers.Sound.Play("SFX/NoGetscore", Define.Sound.SFX);
                return;
        }

        Managers.Sound.Play("SFX/Getscore", Define.Sound.SFX);
        Managers.Coroutine.Run(ShowFeedback(GM));
    }

    private IEnumerator ShowFeedback(GameScene GM)
    {
        GM.scoreImage.gameObject.SetActive(true);
        yield return new WaitForSeconds(1.5f);
        GM.scoreImage.gameObject.SetActive(false);
    }
}
