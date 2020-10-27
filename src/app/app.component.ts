import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes, clusters, links } from './data';
import { Subject } from 'rxjs';
import {GraphService} from "./graph.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  artifactID = '';
  tenant = 'i2s';
  relationship = 'is-used';
  limit = 20;
  page = 1;

  configWindowWidth = 0;

  graphHeight = 0;
  graphWidth = 0;

  nodes: Node[] = nodes;
  clusters: ClusterNode[] = clusters;

  links: Edge[] = links;
  
  layout: String | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];


  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(private graphService: GraphService) {
  }

  ngOnInit() {
    this.graphHeight = window.innerHeight;
    this.setInterpolationType(this.curveType);
  }

  renderGraph(tenant, artifactID, limit, page) {
    this.configWindowWidth = document.getElementById('config').offsetWidth;
    this.graphWidth = window.innerWidth - this.configWindowWidth;

    switch (this.relationship) {
      case 'is-used':
        this.graphService.getIsUsedGraph(tenant, artifactID, limit, page)
            .subscribe(data => {
              this.nodes = data.nodes;
              this.links = data.links;
              this.clusters = [];
            });
        break;
      case 'uses':
      default:
        this.graphService.getUsesGraph(tenant, artifactID, limit, page)
            .subscribe(data => {
              this.nodes = data.nodes;
              this.links = data.links;
              this.clusters = [];
            });
        break;
    }
  }
   
  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      this.clusters = undefined;
    } else {
      this.clusters = clusters;
    }
  }

  nodeInfo(node: any): string {
    // is a validator/condept pair
    if (node.metadata && node.metadata['concept_id']) {
      return `<b>Concept ID</b>: ${node.metadata['concept_id']}</br><b>Validator ID</b>: ${node.metadata['validator_id']}`;
    }

    // is a generic artifact
    if (node.metadata) {
      return `<b>ID</b>: ${node.metadata['internal_id']}</br><b>External ID:</b> ${node.metadata['external_id']}</br><b>Version:</b> ${node.metadata.version}</br><b>Line of Business:</b> ${node.metadata.lob}`;
    }

    return '';
  }
}
