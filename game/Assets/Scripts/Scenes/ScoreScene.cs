using UnityEngine;
using UnityEngine.UI;


public class ScoreScene : MonoBehaviour
{
    public Text playTimeTxt;
    public Text correctScoreTxt;

    void Start()
    {
        AudioManager.instance.PlaySfx(AudioManager.Sfx.ShowScore);
        playTimeTxt.text = GameManager.Instance.playTimeTxt;
        // 점수 텍스트 업데이트
        correctScoreTxt.text = string.Format("{0:n0}", GameManager.Instance.finalScore);
    }
}
