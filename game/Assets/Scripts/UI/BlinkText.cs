using UnityEngine;
using UnityEngine.UI;

public class BlinkText : MonoBehaviour
{
    private readonly float time = 1f;

    void Update()
    {
        float alpha = Mathf.PingPong(Time.time / time, 1f);
        GetComponent<Text>().color = new Color(1, 1, 1, alpha);
    }
}
