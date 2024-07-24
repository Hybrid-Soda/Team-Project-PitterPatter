using UnityEngine;
using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;

public class UDPReceive_backup : MonoBehaviour
{
    Thread receiveThread; // 데이터 수신용 스레드
    UdpClient client; // UDP 클라이언트
    private int port = 5054; // 포트 번호
    public bool startRecieving = true; // 수신 시작 여부
    public bool printToConsole = false; // 콘솔 출력 여부
    public string data; // 수신 데이터

    public void Start()
    {
        client = new UdpClient(port); // 클라이언트 초기화
        receiveThread = new Thread(new ThreadStart(ReceiveData)) // 스레드 초기화
        {
            IsBackground = true // 백그라운드 스레드 설정
        };
        receiveThread.Start(); // 스레드 시작
    }

    private void ReceiveData()
    {
        while (startRecieving) // 수신 중일 때
        {
            try
            {
                IPEndPoint anyIP = new IPEndPoint(IPAddress.Any, 0); // 모든 IP에서 수신
                byte[] dataByte = client.Receive(ref anyIP); // 데이터 수신
                data = Encoding.UTF8.GetString(dataByte); // 문자열로 변환

                if (printToConsole) { print(data); } // 콘솔 출력
            }
            catch (Exception err)
            {
                print(err.ToString()); // 예외 출력
            }
        }
    }

    public void UDPClose()
    {
        receiveThread.Abort(); // 스레드 종료
        client.Close(); // 클라이언트 종료
    }
}
