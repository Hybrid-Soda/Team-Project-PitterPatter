using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BlinkingText : MonoBehaviour
{
    public Text textToBlink;

    private void Start()
    {
        if (textToBlink != null)
        {
            StartCoroutine(BlinkText());
        }
    }

    private IEnumerator BlinkText()
    {
        while (true)
        {
            // 투명하게 만들기
            textToBlink.color = new Color(textToBlink.color.r, textToBlink.color.g, textToBlink.color.b, 0);
            yield return new WaitForSeconds(0.5f);

            // 다시 보이게 만들기
            textToBlink.color = new Color(textToBlink.color.r, textToBlink.color.g, textToBlink.color.b, 1);
            yield return new WaitForSeconds(0.7f);
        }
    }
}
