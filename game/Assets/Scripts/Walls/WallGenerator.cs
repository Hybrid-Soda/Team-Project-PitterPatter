using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WallGenerator : MonoBehaviour
{
    public GameObject[] walls1;
    public GameObject[] walls2;
    private readonly float[] genSpeeds = { 9.0f, 8.0f, 7.0f, 6.0f, 5.0f, 4.0f };
    private GameScene GM;
    private float preTime;
    private float genSpeed;

    private void Start()
    {
        GM = FindObjectOfType<GameScene>();
        SetGenSpeed();
    }

    private void Update()
    {
        if (!GM.isRoundUp)
        {
            if (GM.round == 1)
            {
                GenWall(walls1);
            }
            else if (GM.round == 2)
            {
                GenWall(walls2);
            }
        }
    }

    // 생성
    private void GenWall(GameObject[] walls)
    {
        if (Time.time - preTime > genSpeed)
        {
            int wallIdx = Random.Range(0, walls.Length);
            Instantiate(walls[wallIdx], new Vector3(0, 1, 30), Quaternion.Euler(0, 180, 0) * walls[wallIdx].transform.rotation);
            preTime = Time.time;
        }
    }

    // 생성 속도 설정
    private void SetGenSpeed()
    {
        int diffLevel = Managers.Play.DiffLevel;
        genSpeed = GM.round == 1 ? genSpeeds[diffLevel - 1] : genSpeeds[diffLevel - 1] - 1.0f;
    }
}
