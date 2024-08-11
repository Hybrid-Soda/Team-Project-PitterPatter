using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoroutineManager : MonoBehaviour
{
    public Coroutine Run(IEnumerator coroutine)
    {
        return StartCoroutine(coroutine);
    }

    public void Stop(Coroutine coroutine)
    {
        StopCoroutine(coroutine);
    }
}
