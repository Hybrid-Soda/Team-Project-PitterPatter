using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameScene : BaseScene
{
    public BaseRound nowRound;

    public int round = 0;
    public int score = 0;
    public float playTime;
    public float nextTime;
    public bool isRoundUp;

    public Text scoreTxt;
    public Text playTimeTxt;
    public Image countImage;
    public Image roundImage;
    public Image clearImage;
    public Image scoreImage;

    public Sprite[] countSprites;
    public Sprite[] roundSprites;
    public Sprite[] scoreSprites;
    public List<GameObject> colliders = new();

    void Start()
    {
        Managers.Map.Init();
        UpdateRound(new Round1());
    }

    void Update()
    {
        if (!isRoundUp)
        {
            playTime += Time.deltaTime;
        }
            UpdateUI();
            nowRound.Update(this);
    }

    public void UpdateRound(BaseRound newRound)
    {
        nowRound = newRound;
        nowRound.Enter(this);
    }

    private void UpdateUI()
    {
        int min = (int)(playTime / 60);
        int second = (int)(playTime % 60);
        
        scoreTxt.text = score.ToString("n0");
        playTimeTxt.text = $"{min:00}:{second:00}";
    }
}