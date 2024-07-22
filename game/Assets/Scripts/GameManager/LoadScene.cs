using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LoadScene : MonoBehaviour
{
    private GameManager gm;
    void Start()
    {
        gm = transform.GetComponent<GameManager>();
        PlayerPrefs.SetInt("Score", 0);
        gm.SetDifficulty(PlayerPrefs.GetInt("DifficultyLevel", 3)); // 기본 난이도 3로 설정
        gm.ToStart();
    }
}