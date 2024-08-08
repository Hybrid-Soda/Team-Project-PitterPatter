using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class VolumeController : MonoBehaviour
{
    public Slider bgm_slider;

    void Start()
    {
        bgm_slider = bgm_slider.GetComponent<Slider>();
        bgm_slider.onValueChanged.AddListener(ChangeBgmSound);
    }

    public void ChangeBgmSound(float value)
    {
        Managers.Sound.NowBGM.volume = value;
    }
}
