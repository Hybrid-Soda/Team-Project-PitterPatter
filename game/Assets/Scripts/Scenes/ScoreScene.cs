using UnityEngine;
using UnityEngine.UI;


public class ScoreScene : BaseScene
{
    public Text playTimeTxt;
    public Text correctScoreTxt;

    void Start()
    {
        Managers.Network.UnityCall(true, false);
        Managers.Sound.Play("SFX/Showscore", Define.Sound.SFX);

        // UI 업데이트
        correctScoreTxt.text = string.Format("{0:n0}", Managers.Network.finalScore);
        playTimeTxt.text = Managers.Network.playTimeTxt;
    }
}
