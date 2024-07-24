using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DifficultySelect : MonoBehaviour
{
    public void SetDifficultyLevel(int level)
    {
        if (GameManager.Instance != null)
        {
            GameManager.Instance.difficultyLevel = level;
            GameManager.Instance.ToGame();
        }
    }
}
