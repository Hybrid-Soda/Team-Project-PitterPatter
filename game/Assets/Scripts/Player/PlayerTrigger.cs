using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerTrigger : MonoBehaviour
{
    private GameScene GM;

    void Awake()
    {
        GM = FindObjectOfType<GameScene>();
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!GM.colliders.Contains(other.gameObject))
        {
            if (GM.round == 1)
            {
                // 오브젝트가 아직 목록에 없고 태그가 동일한 경우 목록에 추가
                if (gameObject.CompareTag(other.gameObject.tag))
                    GM.colliders.Add(other.gameObject);
            }
            else if (GM.round == 2)
            {
                // 오브젝트가 아직 목록에 없는 경우 목록에 추가
                GM.colliders.Add(gameObject);
            }
        }
    }
}
