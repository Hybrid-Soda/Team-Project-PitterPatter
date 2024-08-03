using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class VolumeController : MonoBehaviour
{
    public Slider bgm_slider;
    private AudioSource bgm_player;

    void Start()
    {
        bgm_slider = bgm_slider.GetComponent<Slider>();
        bgm_player = GameObject.Find("BgmPlayer").GetComponent<AudioSource>();

        bgm_slider.onValueChanged.AddListener(ChangeBgmSound);
    }

    public void ChangeBgmSound(float value)
    {
        bgm_player.volume = value;
    }
}
