import {getApps, cert, initializeApp} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = ()=> {
    const apps = getApps();


    if (!apps.length) {
        initializeApp({
            credential: cert({
                projectId: "prepwise-61bd6",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCWBLy22avEemPL\\n3ucYP+EKSyNoXz4IJWEXa/Mq8VA4I7Z1n3fpqZSQXpLO+wRC8ZCYhLqvzwId1go9\\nP4cA5UnhzfuqMKXjHfaoquQkrJtAsqrL7lfIb//TkNRHj3ntJlb02stNPGc32H2n\\niraob/WDQCtT1HUOkdt+dNKloCp7+xiQJIqRwx5oNuIW9m5RmJqsjbaJCEqLg4yj\\nVfSd7XNxitKGFzcoc6SJg7VPjDDNVULBM1RmGkgQs/5xjJVdCGIGdNXqxbHjn2d6\\naUMuFqsDY4Xmxx7ttXhARDLlrjnmMKKwqaoW0GfjgBuHfkpS9KNKGx0PslelfnBI\\nWZXnL2UnAgMBAAECggEAP9fbQgvHnFGjt+bwPTMuP9WzR19FBG138OJJdayFwaZ9\\nJ3iKrR+0sG33F2vfJ+gq66WM13YHBhCJggBPoXNy6kxhfk++wTWGu8giWHM2jSWc\\nJzaTGCOF4ZEgriWis2ieGA0m+QMsQCl7bDpNusgO2WENL1tax60OFrZ70O2lNuaC\\nAjutwgtdgNtNAQUXzUI/h3hHa8Hw1L79vfzYi+l9AeCEQVFEDmv4uGS4qe5NFsNt\\nSfYRryugOoxPro55Iue7kRDt++te5XPZ+YryfKjlCKl1WBuvmZqlYWWEPopWwwXw\\neurUdzC+AqL7c8sFbrqNZcU/NkYRg2i68Z9NEOhqZQKBgQDFw33fO9Q6cSgNf4f3\\nGj4Pkg3Z+inQmfQY0/QDo1iRSTaplrwrkxwBxktBBbaMZv/ngwLBJJrsavpb0vuV\\nW9ihF/UEQW6TWXGnn2EvNOlWmzBGo1KPrM/97d26TppssvbRi7dZ8M0ukxMeGMxj\\nSU4w8heHWPgiRl5I/DwXH4eD5QKBgQDCMfSJjR1csPBLQ+iXM3FtjhuMR8a65410\\nw86vsCC3xqATfrRiGb7eL+NockkesTfXdvBN48sY70F5XLPtkM2Xe3PtbbiXFNN6\\nIVK6gc74aZdBEQbnWTfD9m4cb1iqvoxciL+1BKjhUrrMJQIWBFAYrHGE1qTXoRKc\\nki3RYwLMGwKBgGIYgktE5hTHJFLtu4e6oKYgkHZbPHqYoxfdquBTGg+W/WJJvrTu\\nl6nZrmJmbxJd1PoFZkxf1+kFd4IsuVZw5JejxomB21ODvnii+hXsbQHkoKGpSb6y\\nvcj7QEy1yKu6aeuvHhei9mPv2D/JlTh6mCp3K2ybmRmHRiV12Giv3wxxAoGAdDzq\\nnpr1BFJ0wth3FGoabvUs0B72eVG4fjfmM4s9SkN99a1V05KNiPkpKY+e7NwvDK2I\\n0VaUbuxnSHmQyZZvOUkP7wJKB0TUALqJhlHEzTSG8M98TmY81vNenW6YqDs+UPUZ\\nqwSLAbQ/U4qjYQJb3yj5GgZQzTEAru9gtYCKYBkCgYAsAi4P2DBm2dKbYfnopOY1\\nH8JMJI3k9d1UEW49pucbD1K2nDb+tjcsKDyD4h9RxpQdIPspDaUz0YKBzM/9Qies\\nl+lNod3jPCaOSlqDK7Dl9YuP1uWIC4C8qnK5wIaC3qnTq96yZJZiBjr7wuvsns52\\nH/inlCb3EpkSzoX6XQPe0Q==\\n-----END PRIVATE KEY-----\\n".replace(/\\n/g, '\n'),
            })
        })
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

export const { auth, db } = initFirebaseAdmin()

