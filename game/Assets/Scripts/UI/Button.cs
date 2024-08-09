using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Button : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    private Vector3 originalScale;

    private void Start()
    {
        originalScale = transform.localScale;
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        Managers.Sound.Play("SFX/ToggleBtn", Define.Sound.SFX);
        transform.localScale = originalScale * 1.2f;
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        transform.localScale = originalScale;
    }

    public void ToMainScene()
    {
        if (Time.timeScale == 0)
        {
            Time.timeScale = 1;
        }
        Managers.Scene.LoadScene(Define.Scene.MainScene);
    }

    public void ToDifficultyScene()
    {
        Managers.Scene.LoadScene(Define.Scene.DifficultyScene);
    }
}
