"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navigation } from "@/components/navigation";
import {
  Plus,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Target,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  environment: "production" | "staging" | "development";
  totalTests: number;
  passedTests: number;
  failedTests: number;
  lastRun: string;
  status: "active" | "inactive";
  type: "web" | "mobile" | "api";
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce Web",
      description:
        "Sistema de e-commerce principal com funcionalidades de carrinho, pagamento e gerenciamento de produtos",
      url: "https://ecommerce.example.com",
      environment: "production",
      totalTests: 45,
      passedTests: 40,
      failedTests: 5,
      lastRun: "2 horas atrás",
      status: "active",
      type: "web",
    },
    {
      id: "2",
      name: "Mobile App iOS",
      description:
        "Aplicativo móvel para iOS com funcionalidades nativas e integração com backend",
      url: "app://ios-app",
      environment: "staging",
      totalTests: 28,
      passedTests: 26,
      failedTests: 2,
      lastRun: "1 dia atrás",
      status: "active",
      type: "mobile",
    },
    {
      id: "3",
      name: "API Gateway",
      description:
        "Gateway de APIs com autenticação, rate limiting e monitoramento",
      url: "https://api.example.com",
      environment: "production",
      totalTests: 67,
      passedTests: 62,
      failedTests: 5,
      lastRun: "30 min atrás",
      status: "active",
      type: "api",
    },
    {
      id: "4",
      name: "Admin Dashboard",
      description:
        "Painel administrativo para gerenciamento de usuários e configurações",
      url: "https://admin.example.com",
      environment: "development",
      totalTests: 18,
      passedTests: 15,
      failedTests: 3,
      lastRun: "3 dias atrás",
      status: "inactive",
      type: "web",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    environment: "development" as "production" | "staging" | "development",
    type: "web" as "web" | "mobile" | "api",
  });

  const handleCreateProject = () => {
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      url: "",
      environment: "development",
      type: "web",
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      url: project.url,
      environment: project.environment,
      type: project.type,
    });
    setIsDialogOpen(true);
  };

  const handleViewTests = (project: Project) => {
    // Armazena o ID do projeto no localStorage para que o menu Testes saiba qual projeto mostrar
    localStorage.setItem("selectedProjectId", project.id);
    localStorage.setItem("selectedProjectName", project.name);
    // Redireciona para a página de testes
    window.location.href = "/tests";
  };

  const handleSaveProject = () => {
    if (editingProject) {
      // Atualizar projeto existente
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Criar novo projeto
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        lastRun: "Nunca",
        status: "active",
      };
      setProjects((prev) => [...prev, newProject]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "api":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getEnvironmentBadge = (environment: string) => {
    const variants = {
      production: "default" as const,
      staging: "secondary" as const,
      development: "outline" as const,
    };
    return (
      <Badge variant={variants[environment as keyof typeof variants]}>
        {environment}
      </Badge>
    );
  };

  const getSuccessRate = (project: Project) => {
    if (project.totalTests === 0) return 0;
    return Math.round((project.passedTests / project.totalTests) * 100);
  };

  const totalStats = projects.reduce(
    (acc, project) => ({
      totalTests: acc.totalTests + project.totalTests,
      passedTests: acc.passedTests + project.passedTests,
      failedTests: acc.failedTests + project.failedTests,
      activeProjects:
        acc.activeProjects + (project.status === "active" ? 1 : 0),
    }),
    { totalTests: 0, passedTests: 0, failedTests: 0, activeProjects: 0 }
  );

  return (
    <Navigation>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">
              Gerencie seus projetos de teste e ambientes
            </p>
          </div>
          <Button onClick={handleCreateProject}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="projects-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projetos Ativos
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalStats.activeProjects}
              </div>
              <p className="text-xs text-muted-foreground">
                de {projects.length} total
              </p>
            </CardContent>
          </Card>

          <Card className="projects-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Testes
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalTests}</div>
              <p className="text-xs text-muted-foreground">
                em todos os projetos
              </p>
            </CardContent>
          </Card>

          <Card className="projects-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Testes Aprovados
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalStats.passedTests}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalStats.totalTests > 0
                  ? Math.round(
                      (totalStats.passedTests / totalStats.totalTests) * 100
                    )
                  : 0}
                % de sucesso
              </p>
            </CardContent>
          </Card>

          <Card className="projects-metrics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Testes Falharam
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {totalStats.failedTests}
              </div>
              <p className="text-xs text-muted-foreground">requerem atenção</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="relative project-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(project.type)}
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getEnvironmentBadge(project.environment)}
                        <Badge
                          variant={
                            project.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewTests(project)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar Testes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Testes: {project.totalTests}</span>
                    <span className="text-green-600">
                      {project.passedTests} passaram
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${getSuccessRate(project)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Última execução
                    </span>
                    <span>{project.lastRun}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      <span className="truncate">{project.url}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para Criar/Editar Projeto */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Atualize as informações do projeto"
                  : "Crie um novo projeto para organizar seus testes"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Projeto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: E-commerce Principal"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descreva o projeto e suas funcionalidades"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">URL/Endpoint</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://example.com ou app://mobile-app"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="environment">Ambiente</Label>
                  <Select
                    value={formData.environment}
                    onValueChange={(value) =>
                      setFormData({ ...formData, environment: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProject}>
                {editingProject ? "Atualizar" : "Criar"} Projeto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Navigation>
  );
}
