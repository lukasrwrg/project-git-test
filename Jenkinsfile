pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                sh './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'arch/TestApp.zip'
            }
        }
        stage('DeployToTestServer') {
            when {
                branch 'master'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'TestServerLogin', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'TestServer',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'arch/TestApp.zip',
                                        removePrefix: 'arch/',
                                        remoteDirectory: '/tmp',
                                        execCommand: 'rm -rf /usr/share/nginx/html/* && unzip /tmp/TestApp.zip -d /usr/share/nginx/html'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('DeployToProduction') {
            when {
                branch 'master'
            }
            steps {
                input 'Does the Test environment look OK?'
                milestone(1)
                withCredentials([usernamePassword(credentialsId: 'ProducionServerLogin', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ProdactionServer',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'arch/TestApp.zip',
                                        removePrefix: 'arch/',
                                        remoteDirectory: '/tmp',
                                        execCommand: 'sudo rm -rf /usr/share/nginx/html/* && unzip /tmp/TestApp.zip -d /usr/share/nginx/html'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
