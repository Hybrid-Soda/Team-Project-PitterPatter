using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class HoverBtn : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public float hoverScaleFactor = 1.2f;
    public Color hoverColor = Color.white;
    private Vector3 originalScale;
    private Color originalColor;
    private Text buttonText;

    private void Start()
    {
        originalScale = transform.localScale;
        buttonText = GetComponentInChildren<Text>();
        if (buttonText != null)
        {
            originalColor = buttonText.color;
        }
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        transform.localScale = originalScale * hoverScaleFactor;
        if (buttonText != null)
        {
            buttonText.color = hoverColor;
        }
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        transform.localScale = originalScale;
        if (buttonText != null)
        {
            buttonText.color = originalColor;
        }
    }
}
