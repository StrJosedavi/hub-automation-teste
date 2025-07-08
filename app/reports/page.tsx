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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navigation } from "@/components/navigation";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  Activity,
  Download,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function ReportsPage() {
  const metrics = {
    totalExecutions: 1247,
    successRate: 91.2,
    avgExecutionTime: 2.4,
    testsPerDay: 45,
    criticalIssues: 3,
    coverage: 87.5,
  };

  const trendData = [
    { period: "Esta Semana", executions: 315, successRate: 91.2, avgTime: 2.4 },
    {
      period: "Semana Passada",
      executions: 298,
      successRate: 89.7,
      avgTime: 2.6,
    },
    {
      period: "Há 2 Semanas",
      executions: 287,
      successRate: 88.3,
      avgTime: 2.8,
    },
    {
      period: "Há 3 Semanas",
      executions: 276,
      successRate: 87.1,
      avgTime: 3.1,
    },
  ];

  const categoryMetrics = [
    {
      name: "Authentication",
      tests: 24,
      passed: 22,
      failed: 2,
      successRate: 91.7,
    },
    { name: "E-commerce", tests: 45, passed: 41, failed: 4, successRate: 91.1 },
    { name: "Search", tests: 18, passed: 17, failed: 1, successRate: 94.4 },
    {
      name: "User Management",
      tests: 32,
      passed: 29,
      failed: 3,
      successRate: 90.6,
    },
    { name: "API", tests: 37, passed: 33, failed: 4, successRate: 89.2 },
  ];

  const performanceData = [
    { test: "Login Flow", avgTime: 1.2, trend: "down", change: -0.3 },
    { test: "Checkout Process", avgTime: 3.4, trend: "up", change: 0.2 },
    { test: "User Registration", avgTime: 2.1, trend: "down", change: -0.1 },
    { test: "Product Search", avgTime: 0.9, trend: "down", change: -0.2 },
    { test: "Profile Update", avgTime: 1.8, trend: "up", change: 0.1 },
  ];

  const criticalIssues = [
    {
      test: "Payment Gateway",
      issue: "Timeout em transações acima de R$ 1000",
      priority: "Critical",
      lastSeen: "2 horas atrás",
      occurrences: 15,
    },
    {
      test: "User Registration",
      issue: "Falha na validação de email",
      priority: "High",
      lastSeen: "1 dia atrás",
      occurrences: 8,
    },
    {
      test: "Product Filter",
      issue: "Resultados inconsistentes com múltiplos filtros",
      priority: "Medium",
      lastSeen: "2 dias atrás",
      occurrences: 3,
    },
  ];

  return (
    <Navigation>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Métricas detalhadas e análises de performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 dias</SelectItem>
                <SelectItem value="30days">30 dias</SelectItem>
                <SelectItem value="90days">90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Execuções Totais
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalExecutions.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +12% desde o mês passado
              </div>
            </CardContent>
          </Card>

          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Sucesso
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.successRate}%</div>
              <Progress value={metrics.successRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.avgExecutionTime}s
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingDown className="w-3 h-3" />
                -0.3s desde ontem
              </div>
            </CardContent>
          </Card>

          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Testes por Dia
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.testsPerDay}</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +8% desde a semana passada
              </div>
            </CardContent>
          </Card>

          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Problemas Críticos
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {metrics.criticalIssues}
              </div>
              <p className="text-xs text-muted-foreground">
                requerem ação imediata
              </p>
            </CardContent>
          </Card>

          <Card className="reports-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cobertura</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.coverage}%</div>
              <Progress value={metrics.coverage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Análise de Tendências */}
          <Card className="reports-card">
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
              <CardDescription>Performance ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{data.period}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.executions} execuções
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {data.successRate}%
                        </span>
                        {index === 0 && (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {data.avgTime}s médio
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas por Categoria */}
          <Card className="reports-card">
            <CardHeader>
              <CardTitle>Performance por Categoria</CardTitle>
              <CardDescription>
                Taxa de sucesso por área funcional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryMetrics.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.passed}/{category.tests} testes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={category.successRate}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12">
                        {category.successRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Individual */}
          <Card className="reports-card">
            <CardHeader>
              <CardTitle>Performance Individual</CardTitle>
              <CardDescription>Tempo de execução por teste</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teste</TableHead>
                    <TableHead>Tempo Médio</TableHead>
                    <TableHead>Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((test) => (
                    <TableRow key={test.test}>
                      <TableCell className="font-medium">{test.test}</TableCell>
                      <TableCell>{test.avgTime}s</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {test.trend === "down" ? (
                            <TrendingDown className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm ${
                              test.trend === "down"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {test.change > 0 ? "+" : ""}
                            {test.change}s
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Problemas Críticos */}
          <Card className="reports-card">
            <CardHeader>
              <CardTitle>Problemas Críticos</CardTitle>
              <CardDescription>
                Issues que requerem atenção imediata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalIssues.map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{issue.test}</p>
                        <p className="text-sm text-muted-foreground">
                          {issue.issue}
                        </p>
                      </div>
                      <Badge
                        variant={
                          issue.priority === "Critical"
                            ? "destructive"
                            : issue.priority === "High"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{issue.occurrences} ocorrências</span>
                      <span>{issue.lastSeen}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Executivo */}
        <Card className="executive-summary">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>
              Visão geral do status dos projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Pontos Positivos</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Taxa de sucesso acima de 90%</li>
                  <li>• Tempo médio de execução melhorou</li>
                  <li>• Cobertura de testes em 87.5%</li>
                  <li>• Performance de Search melhorou significativamente</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-yellow-600">
                  Áreas de Atenção
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 3 problemas críticos pendentes</li>
                  <li>• Checkout Process com tempo aumentando</li>
                  <li>• API tests com maior variação</li>
                  <li>• Necessário investigar timeouts frequentes</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">Recomendações</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Priorizar correção do Payment Gateway</li>
                  <li>• Implementar retry automático em APIs</li>
                  <li>• Aumentar cobertura para 95%</li>
                  <li>• Configurar alertas para testes críticos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Navigation>
  );
}
