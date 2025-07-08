"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Play,
  Target,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const metrics = {
    totalTests: 156,
    passedTests: 142,
    failedTests: 8,
    pendingTests: 6,
    successRate: 91.2,
    avgExecutionTime: 2.4,
    testsToday: 45,
    activeProjects: 3,
  };

  const recentActivity = [
    {
      id: "1",
      type: "test_completed",
      message: "Login Flow Test executado com sucesso",
      time: "2 min atrás",
      status: "success",
    },
    {
      id: "2",
      type: "test_failed",
      message: "Checkout Process falhou na verificação de pagamento",
      time: "15 min atrás",
      status: "error",
    },
    {
      id: "3",
      type: "project_created",
      message: "Novo projeto 'Mobile App Android' criado",
      time: "1 hora atrás",
      status: "info",
    },
  ];

  return (
    <Navigation>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do hub de automação de testes
            </p>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dashboard-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Testes
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalTests}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.testsToday} executados hoje
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Sucesso
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {metrics.successRate}%
              </div>
              <Progress value={metrics.successRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="dashboard-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Testes Aprovados
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {metrics.passedTests}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +5% desde ontem
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Testes Falharam
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {metrics.failedTests}
              </div>
              <div className="flex items-center gap-1 text-xs text-red-600">
                <TrendingDown className="w-3 h-3" />
                -2 desde ontem
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status dos Projetos */}
        <Card className="dashboard-project-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Projetos Ativos</CardTitle>
                <CardDescription>
                  Status dos seus projetos de teste
                </CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/projects">Ver Todos</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg dashboard-project-item">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">E-commerce Web</h3>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Testes: 45</span>
                    <span className="text-green-600">40 passaram</span>
                  </div>
                  <Progress value={88.9} />
                </div>
              </div>

              <div className="p-4 border rounded-lg dashboard-project-item">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Mobile App</h3>
                  <Badge variant="secondary">Staging</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Testes: 28</span>
                    <span className="text-green-600">26 passaram</span>
                  </div>
                  <Progress value={92.9} />
                </div>
              </div>

              <div className="p-4 border rounded-lg dashboard-project-item">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Admin Dashboard</h3>
                  <Badge variant="outline">Dev</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Testes: 18</span>
                    <span className="text-green-600">16 passaram</span>
                  </div>
                  <Progress value={88.9} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {/* Atividade Recente */}
          <Card className="dashboard-recent-activity">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas execuções e eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 dashboard-activity-item"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "error"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Navigation>
  );
}
