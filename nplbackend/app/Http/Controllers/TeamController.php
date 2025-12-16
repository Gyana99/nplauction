<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TeamController extends Controller
{


    public function addteam(Request $request)
    {
        // ✅ VALIDATION
        $validator = Validator::make($request->all(), [
            'team_name'    => 'required|string|max:100',
            'short_name'   => 'required|string|max:50',
            'woner_name'   => 'required|string|max:200',
            'logo'         => 'required|string',
            'woner_image'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // ✅ SAVE LOGO IMAGE
        $logoPath = $this->saveBase64Image($request->logo, 'uploads/logo');

        // ✅ SAVE OWNER IMAGE
        $ownerPath = $this->saveBase64Image($request->woner_image, 'uploads/owner');

        // ✅ INSERT INTO DATABASE
        $team = DB::table('team')->insert([
            'team_name'   => $request->team_name,
            'short_name'  => $request->short_name,
            'woner_name'  => $request->woner_name,
            'logo'        => $logoPath,
            'woner_image' => $ownerPath,
            'status'      => 1,
            'created_at'  => Carbon::now()->toDateTimeString(),
            'created_by'  => $request->created_by,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Team added successfully'
        ]);
    }
    public function viewTeam()
    {
        $teams = DB::table('team')
            ->orderBy('created_at', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $teams
        ], 200);
    }
    public function updateTeam(Request $request)
    {
        // 🔹 Find existing team
        $team = DB::table('team')->where('id', $request->id)->first();

        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found'
            ], 404);
        }

        /* =============================
       HANDLE LOGO
    ============================== */
        $logo = $team->logo;

        if ($request->logo && str_contains($request->logo, 'base64')) {
            $logo = $this->saveBase64Image($request->logo, 'app/public/teams/logo');
        }

        /* =============================
       HANDLE OWNER IMAGE
    ============================== */
        $ownerImage = $team->woner_image;

        if ($request->woner_image && str_contains($request->woner_image, 'base64')) {
            $ownerImage = $this->saveBase64Image($request->woner_image, 'app/public/teams/owner');
        }

        /* =============================
       UPDATE DATABASE
    ============================== */
        DB::table('team')->where('id', $request->id)->update([
            'team_name'   => $request->team_name,
            'short_name'  => $request->short_name,
            'woner_name'  => $request->woner_name,
            'logo'        => $logo,
            'woner_image' => $ownerImage,
            'updated_at'  => Carbon::now()->toDateTimeString(),
            'created_by'  => $request->created_by,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Team updated successfully'
        ]);
    }
    public function giveAmount(Request $request)
    {
        $input = $request->all();
        // return $input['id'];
        //✅ Validate request
        // $request->validate([
        //     'id' => 'required|integer|exists:teams,id'
        // ]);

        // 🔎 Get team
        $team = DB::table('team')->where('id', $request->id)->first();

        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found'
            ], 404);
        }

        // ✅ Update amount status
        DB::table('team')->where('id', $input['id'])->update([
            'amount_status' => 1,
            'amount' => 5000,
            'created_by' => $input['created_by'],
            'updated_at' => Carbon::now()->toDateTimeString()
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Amount given successfully'
        ]);
    }

    private function saveBase64Image($base64Image, $folder)
    {
        // extract image type
        preg_match('/data:image\/(.*?);base64/', $base64Image, $match);
        $extension = $match[1] ?? 'png';

        // remove base64 header
        $image = preg_replace('/^data:image\/.*;base64,/', '', $base64Image);
        $image = base64_decode($image);

        // create filename
        $fileName = Str::random(20) . '.' . $extension;
        $path = storage_path($folder);;
        // return $path ;

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        file_put_contents($path . '/' . $fileName, $image);

        return  $fileName;
    }
    public function mypointandhistry(Request $request)
    {
        $id = $request->input('adminid');

        // 1️⃣ Get team_id directly
        $teamId = DB::table('admin')
            ->where('id', $id)
            ->value('team_id');

        if (!$teamId) {
            return response()->json([
                'status' => false,
                'message' => 'Admin or Team not found'
            ], 404);
        }

        // 2️⃣ Get team amount
        $amount = DB::table('team')
            ->where('id', $teamId)
            ->value('amount');

        // 3️⃣ Get total players count
        $totalPlayers = DB::table('player_registration')
            ->where('team', $teamId)
            ->where('status',1)
            ->get();

        // 4️⃣ Return optimized response
        return response()->json([
            'status' => true,
            'amount' => $amount,
            'total_players' => $totalPlayers
        ], 200);
    }
}
